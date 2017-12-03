#!/usr/bin/env ruby
ARGF.each_with_index do |line, idx|
    print ARGF.filename, ":", idx, ";", line
end

# print all the lines in every file passed via command line that contains login
ARGF.each do |line|
    puts line if line =~ /login/
end
