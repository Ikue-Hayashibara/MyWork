module Rainbowable
  def rainbow
    to_s.each_char.with_index.map do |s, i|
      "\e[#{31 + (i % 6)}m#{s}"
    end.join + "\e[0m"
  end
end
