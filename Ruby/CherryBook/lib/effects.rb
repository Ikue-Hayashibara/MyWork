module Effects
  class << self
    def reverse
      ->(words) { words.split(" ").map(&:reverse).join(" ") }
    end

    def echo(rate)
      ->(words) {
        words.chars.map {|w| w == " " ? w : (w * rate)}.join
      } 
    end

    def loud(rate)
      ->(words) { 
        words.split(" ").map { |w| w.upcase + ("!" * rate)}
        .join(" ")
      }
    end
  end
end