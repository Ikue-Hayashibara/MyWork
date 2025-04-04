def to_hex(r, g, b)
  [r, g, b].sum("#") do |n|
    n.to_s(16).rjust(2, "0")
  end
end

def to_ints(hex) = hex.scan(/\w\w/).map(&:hex)

# 没
# def to_ints(str_hex)
#   str_hex.slice!(0)
#   str_hex.chars.each_slice(2).map { |str| str.join.hex}
# end

puts to_hex(30,89,45)
p to_ints("#000000")

