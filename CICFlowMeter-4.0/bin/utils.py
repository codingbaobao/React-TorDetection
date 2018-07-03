import os
import sys
import csv
import json
import numpy as np
import pandas as pd
import pickle as pk
import shlex
import argparse
from subprocess import Popen

from utility import *
# import warnings
# warnings.filterwarnings('ignore')

# CSV files are generated from CICFlowMeter with pcap files
# as input. Below shows the available attributes or information
# Information:
# "Src IP", "Src Port", "Dst IP", "Dst Port", "Protocol",
# "Flow Duration", "Flow ID", "Timestamp"
#
# Attributes:
# "Flow Byts/s", "Flow Pkts/s",
# "Flow IAT Mean", "Flow IAT Std", "Flow IAT Max", "Flow IAT Min",
# "Fwd IAT Mean", "Fwd IAT Std", "Fwd IAT Max", "Fwd IAT Min",
# "Bwd IAT Mean", "Bwd IAT Std", "Bwd IAT Max", "Bwd IAT Min",
# "Active Mean", "Active Std", "Active Max", "Active Min",
# "Idle Mean", "Idle Std", "Idle Max", "Idle Min"

# We will run the python script at root directory
# The dircetory, "CICFlowMeter-4.0", is contained in the root directory
BIN_DIR = "./CICFlowMeter-4.0/bin"
CONFIG_PATH = "./CICFlowMeter-4.0/bin/config.json"
MODELA_PATH = "./CICFlowMeter-4.0/bin/randomForestA.sav"
MODELB_PATH = "./CICFlowMeter-4.0/bin/randomForestB.sav"
REALTIME_PCAP_DIR = "Pcaps/realtime"

config = json.load(open(CONFIG_PATH))['Scenario-A']
# SELECTED_INFO list detemined which information is displayed on the website
SELECTED_INFO = [info for info, usage in config["info"].items() if usage]
SELECTED_FEAT = [attr for attr, usage in config["attribute"].items() if usage]
COLLECT_TIME = 10


def csv2json(file, json_file, format):
    '''
        csv2json transforms csv files which contain extracted features
        to json files with label predicted by pretrained models
    '''
    csv_rows = []

    # labels are predicted by pretrained random forest models
    labelA = inference(MODELA_PATH, file, scenario='A')
    labelB = inference(MODELB_PATH, file, scenario='B')

    with open(file) as csvfile:
        reader = csv.DictReader(csvfile)
        title = reader.fieldnames

        # Check what fields are in csv
        # for field in title:
        #    print(field)
        labelA_names = {0: 'TOR', 1: 'nonTOR'}
        labelB_names = {0: 'BROWSING', 1: 'AUDIO', 2: 'CHAT', 3: 'MAIL', 4: 'P2P',
                        5: 'FILE-TRANSFER', 6: 'VOIP', 7: 'VIDEO'}

        for index, row in enumerate(reader):
            predictionA = labelA_names[labelA[index]]
            predictionB = labelB_names[labelB[index]]
            content = {title[i]: row[title[i]]
                       for i in range(len(title)) if title[i] in SELECTED_INFO}
            content['label_A'] = predictionA
            content['label_B'] = predictionB
            try:
                content['Flow Pkts/s'] = str(
                    round(float(content['Flow Pkts/s']), 2))
            except Exception as e:
                print(e.message, e.args)

            csv_rows.extend([content])

            # csv_rows.extend([{title[i]:row[title[i]]
            #                  for i in range(len(title))}])

        write_json(csv_rows, json_file, format)


def write_json(data, json_file, format):
    '''
        write_json converts csv data into json and write it
    '''
    with open(json_file, "w") as f:
        if format == "pretty":
            f.write(json.dumps(data, sort_keys=False, indent=4, separators=(
                ',', ': '), encoding="utf-8", ensure_ascii=False))
        else:
            f.write(json.dumps(data, sort_keys=False, indent=4))


def cicflowmeter2json(args):
    action = args.action
    packet_cnt = args.packet_cnt
    pcap_path = args.pcap_path
    json_path = args.json_path
    filename = "{}.json".format(args.json_filename)
    # There can be multiplie IPs for one host
    IP = os.popen('hostname -I').read().strip().split()[0]

    if action == 'realtime':

        # We use tcpdump to extract pcap files
        pcap_filename = "{}.pcap".format(args.json_filename)
        if not os.path.exists(REALTIME_PCAP_DIR):
            os.makedirs(REALTIME_PCAP_DIR)
        pcap_path = os.path.join(REALTIME_PCAP_DIR, pcap_filename)

        # We first clean the REALTIME_PCAP_DIR to avoid filename
        # collision or some other problems
        rm_command = "rm -f {}/*.pcap".format(REALTIME_PCAP_DIR)
        rm_args = shlex.split(rm_command)
        rm = Popen(rm_args)
        rm.communicate()

        print('-'*30)
        print("Number of packets collected: ", packet_cnt)
        print("IP: ", IP)
        print('='*30)
        # Set tcpdump to collect a certain amount of packets
        # tcpdump_cmd = "sudo tcpdump -c {} host {} -w {}".format(
        #    packet_cnt, IP, pcap_path)

        # Set tcpdump to collect packets for a certain amount of time
        tcpdump_cmd = "sudo tcpdump -G {} -W 1 host {} -w {}".format(
            str(COLLECT_TIME), IP, pcap_path)
        tcpdump_args = shlex.split(tcpdump_cmd)
        tcpdump = Popen(tcpdump_args)
        tcpdump.communicate()

    # cfm can only be executed in 'CICFlowMeter-4.0/bin'
    # Thus, we need to change directory
    home_path = os.getcwd()
    cfm_path = os.path.join(home_path, BIN_DIR)
    abs_pcap_path = os.path.abspath(pcap_path)
    abs_json_path = os.path.abspath(json_path)
    os.chdir(cfm_path)

    # Execute the cfm which is located in 'CICFlowMeter-4.0/bin'
    cfm_command = './cfm {} {}'.format(abs_pcap_path, abs_json_path)
    cfm_args = shlex.split(cfm_command)
    cfm = Popen(cfm_args)
    cfm.communicate()
    os.chdir(home_path)

    filename = ''
    if filename == '':
        filename = pcap_path.split('/')[-1][:-5] + '.pcap_Flow.json'

    json_path = os.path.join(json_path, filename)
    csv2json(json_path[:-5] + '.csv', json_path, format='')
    rm_command = "rm {}".format(json_path[:-5] + '.csv')
    if action == 'realtime':
        rm_command += ' ' + pcap_path
    rm_args = shlex.split(rm_command)
    rm = Popen(rm_args)
    rm.communicate()


def read_json(data_path):
    with open(data_path) as f:
        data = json.load(f)
    return data


def inference(filename, inference_csv, scenario='A'):
    # filename spcecifies the name of pretrained model that is
    # about to be loaded
    clf = pk.load(open(filename, 'rb'))
    df = pd.read_csv(inference_csv)

    attributes = None
    if scenario == 'A':
        config = json.load(open(CONFIG_PATH))['Scenario-A']
        df = df[SELECTED_FEAT]
        attributes = df.as_matrix()
        input_x = X_preprocessing(attributes)
    elif scenario == 'B':
        config = json.load(open(CONFIG_PATH))['Scenario-B']
        attributes = [df[attr]
                      for attr, usage in config["attribute"].items() if usage]
        input_x = np.array(attributes).T

    y_pred = clf.predict(input_x)
    print('label: ', y_pred)
    return y_pred


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='=== internet flow detection ===')
    parser.add_argument('action', choices=['offtime', 'realtime'])
    parser.add_argument('--packet_cnt', default=20, type=int,
                        help='number of packets to detect')
    parser.add_argument('--pcap-path', default='Pcaps/tor/', type=str,
                        help='offtime pcap directory')
    parser.add_argument('--json-path', default='output/Scenario-C', type=str,
                        help='output json directory')
    parser.add_argument('--json-filename', default='', type=str,
                        help='Specify the filename for output json')

    cicflowmeter2json(parser.parse_args())
