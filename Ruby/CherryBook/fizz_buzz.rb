#オリジナル
def fizz_buzz(number)
    return puts "0以外の数値を入力してください" if number == 0
    
    if number % 15 == 0
        puts "Fizz Buzz"
    elsif number % 5 == 0
        puts "Buzz"
    
    elsif number % 3 == 0
        puts "Fizz"
    else
        puts number
    end
    
end

fizz_buzz(1)





