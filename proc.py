import random
import sys
import time

def run():
    while True:
        num = random.randint(0, 2)
        print(num)
        sys.stdout.flush()
        time.sleep(10)


if __name__ == "__main__":
    run()

