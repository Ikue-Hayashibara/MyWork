require "minitest/autorun"
require_relative "../lib/fizz_buzz"

class FizzBuzzTest < Minitest::Test
  def test_fizz_buzz
    assert_equal "1", fizz_buzz(1)
    assert_equal "Fizz", fizz_buzz(3)
    assert_equal "Buzz", fizz_buzz(5)
    assert_equal "Fizz Buzz", fizz_buzz(15)
    assert_equal "17", fizz_buzz(17)
  end
end