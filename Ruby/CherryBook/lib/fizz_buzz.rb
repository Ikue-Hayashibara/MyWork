#オリジナル
def fizz_buzz(n)
    return puts "0以外の数値を入力してください" if n == 0
    
    if n % 15 == 0
        "Fizz Buzz"
    elsif n % 5 == 0
        "Buzz"
    
    elsif n % 3 == 0
        "Fizz"
    else
        n.to_s
    end
    
end


