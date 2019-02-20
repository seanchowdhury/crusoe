File.open("/Users/seanchowdhury/Projects/crusoe/resources/adjectives2.txt", "w+") do |f2|
  File.open("/Users/seanchowdhury/Projects/crusoe/resources/animals.txt", "r") do |f|
    f.each_line do |line|
      f2.puts "'" + line.tr("\n", '') + "',"
    end
  end
end
