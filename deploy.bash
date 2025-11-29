#!/bin/bash

tar --exclude='.git' -cf - . | pv | ssh hetzner "tar -xpf - -C /var/www/sagerio"
