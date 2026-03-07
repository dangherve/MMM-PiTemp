#!/bin/bash
git remote add upstream https://github.com/ckoutavas/MMM-PiTemp.git
git fetch upstream
git rebase upstream/master
git remote set-url origin git@github.com:dangherve/MMM-PiTemp.git
git push --force --set-upstream origin master
