#!/usr/bin/python

import getopt
import sys
import json
from pathlib import Path


def main(argv):
    input_file = ''
    try:
        opts, args = getopt.getopt(argv, "hi:o:", ["ifile="])
    except getopt.GetoptError:
        print('test.py -i <inputfile>')
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print('test.py -i <inputfile>')
            sys.exit()
        elif opt in ("-i", "--ifile"):
            input_file = arg
    print('Input file is ', input_file)

    awair_json = get_awair_json()
    pi_json = get_raspberry_json()
    process_file(input_file)


def process_file(file):
    read_file = Path(file)
    if read_file.is_file():
        readfile = open(file, 'r')
        source_content = readfile.read()
        print(source_content)
        start_tag = "<!-- start_sourhall_data -->"
        end_tag = "<!-- end_sourhall_data -->"
        start_index = source_content.find(start_tag)
        end_index = source_content.find(end_tag)
        if (start_index == -1) or (end_index == -1):
            print('No sourhall data tag in content')
            sys.exit(2)
        else:
            print('index ready')


def get_awair_json():
    awair_path = Path("awair_sourhall.json")
    if awair_path.is_file():
        awair_file = open(awair_path.absolute(), 'r')
        awair_content = awair_file.read()
        print(awair_content)
        return json.loads(awair_content)
    else:
        return None


def get_raspberry_json():
    pi_path = Path("pi.json")
    if pi_path.is_file():
        pi_file = open(pi_path.absolute(), 'r')
        pi_content = pi_file.read()
        print(pi_content)
        return json.loads(pi_content)
    else:
        return None


if __name__ == "__main__":
    main(sys.argv[1:])


