import time
from itertools import permutations
from re import findall


def solve(input_equation):
    """
    Solves Alphametric equations, if any. An alphametric equation is e.g.:
    ME + ME = BEE - this has exactly 1 solution: 50 + 50 = 100
    """
    print(f'Evaluating input: {input_equation}')

    # Do some formatting:
    # - Replace = (equals) with == (programming equals).
    # - Make the equation case insensitive.
    eq_index = input_equation.find('=')
    if input_equation[eq_index + 1] != '=':
        input_equation = input_equation.replace('=', '==')
    input_equation = input_equation.lower()

    # Split the words of the input equation into a list
    words = findall('[A-Za-z]+', input_equation)

    # Find the chars to be substituted by digits. Alphametrics are only solvable
    # if there exist upmost 10 chars, because there only exist digits 0..9
    chars = set(''.join(words))
    assert len(chars) <= 10

    # Find the first letters of each word and list them in the beginning.
    firsts = set(w[0] for w in words)
    chars = ''.join(firsts) + ''.join(chars - firsts)

    # counter for solved equations, because there is possibly more than 1
    solved_counter = 0

    # Get the possible permutations and iterate over them
    for permutation in permutations('0123456789', len(chars)):

        # Exclude permutations with too many 0s.
        # Especially first letters of each word cannot be 0, because there
        # exist no leading 0s.
        if '0' not in permutation[:len(firsts)]:
            translation_table = str.maketrans(chars, ''.join(permutation))
            equation = input_equation.translate(translation_table)

            # If the equation is solvable print it and increase the counter.
            try:
                if eval(equation):
                    solved_counter += 1
                    print(equation)

            # If the equation is not solvable this exception will rise.
            except ArithmeticError:
                pass

    print(f'solutions: {solved_counter}')


if __name__ == '__main__':
    is_running = True

    while is_running:
        stdin = input('enter phrase or \'q\' to quit> ')

        if stdin == 'q':
            is_running = False
        else:

            start_time = time.time()
            try:
                solve(stdin)
            except Exception as e:
                print(e)
            print(f'evaluation took {time.time() - start_time} seconds')
