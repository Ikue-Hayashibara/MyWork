print "Textを入力してください: "
text = gets.chomp
begin
  print "Petternを入力してください: "
  pettern = gets.chomp
  regexp = Regexp.new(pettern)
rescue RegexpError => e
  puts "そんなパターンはない #{e.message}"
  retry
end

matches = text.scan(regexp)

if matches.size > 0
  puts matches.join
else
  puts "マッチするもんがないよ"
end