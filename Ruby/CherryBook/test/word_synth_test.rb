require "minitest/autorun"
require_relative "../lib/effects"
require_relative "../lib/word_synth"

class WordSynthTest < Minitest::Test

  def setup
    @synth = WordSynth.new
  end

  def test_word_synth
    @synth.add_effect(Effects.echo(3))
    @synth.add_effect(Effects.loud(2))
    @synth.add_effect(Effects.reverse)
    assert_equal "!!YYYBBBUUURRR !!SSSIII !!!!!NNNUUUFFF", @synth.play("Ruby is fun!")
  end
end