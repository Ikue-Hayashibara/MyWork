require "minitest/autorun"
require_relative "../lib/rgb"

class RgbTest < Minitest::Test

  def test_to_hex
    assert_equal "#417843", to_hex(65, 120, 67)
  end

  def test_to_ints
    assert_equal [255,255,255], to_ints("#ffffff")
  end

end