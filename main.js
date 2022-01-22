let card_number = []
let sum = 0
let left_card = []

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

for (let i = 6; i < 65; i++) {
    card_number.push(i)
}

for (let i = 1; i < 14; i++) {
    for (let j = 0; j < 4; j++) {
        left_card.push(i)
    }
}

while (sum > 181 || sum < 169) {
    shuffle(card_number)
    sum = card_number.slice(0, 5).reduce((partial_sum, a) => partial_sum + a, 0)
}

card_number = card_number.slice(0, 5)

$(".hand").each(function (index) {
    $(this).html(card_number[index])
})


$("#draw_card_btn").on("click", function () {
    $(".hand_card_section").slideDown()
    $(this).attr("disabled", true)
})


$(".card").on("click", function () {

    let this_card_number = parseInt($(this).parent().attr("id"))

    if ($(this).hasClass("selected")) {
        left_card.push(this_card_number)
        console.log(left_card)
    } else {
        let index = $.inArray(this_card_number, left_card)
        left_card.splice(index, 1)
        console.log(left_card)
    }
    $(this).toggleClass("selected")
    update_cheat()
})

$(".hand").on("click", function () {
    $(this).toggleClass("selected")
})

$("#cheat_btn").on("dblclick", function () {
    $(".cheat").fadeToggle()
})

update_cheat()

function combiner(test) {
    let result = []
    // 順子
    if (test % 5 === 0 && test >= 15 && test <= 55) {
        let mid = test / 5
        let combination1 = [mid - 2, mid - 1, mid, mid + 1, mid + 2]
        result.push(combination1)
    }

    // 鐵支
    let quo1 = Math.floor(test / 4) > 13 ? 13 : Math.floor(test / 4)

    while (quo1 > 0) {
        if (quo1 != test - quo1 * 4 && test - quo1 * 4 < 14 && test - quo1 * 4 > 0) {
            let combination2 = []
            for (let i = 0; i < 4; i++) {
                combination2.push(quo1)
            }
            combination2.push(test - quo1 * 4)
            result.push(combination2)
        }
        quo1--
    }

    // 葫蘆
    let quo2 = Math.floor(test / 3) > 13 ? 13 : Math.floor(test / 3)

    while (quo2 > 0) {
        if ((test - quo2 * 3) % 2 === 0 && (test - quo2 * 3) / 2 < 14 && (test - quo2 * 3) / 2 > 0 && quo2 != (test - quo2 * 3) / 2) {
            let combination3 = []
            for (let i = 0; i < 3; i++) {
                combination3.push(quo2)
            }
            for (let i = 0; i < 2; i++) {
                combination3.push((test - quo2 * 3) / 2)
            }
            result.push(combination3)
        }
        quo2--
    }
    return result
}

function check(arr) {
    let memo_left_card = left_card.filter((el) => {
        return el
    })

    for (let i = 0; i < arr.length; i++) {
        if (!memo_left_card.includes(arr[i])) {
            console.log("err!!!!!")
            return false
        }
        let index = $.inArray(arr[i], memo_left_card)
        memo_left_card.splice(index, 1)
    }
    return true
}

function update_cheat(index) {
    $(".cheat").html("").each(function (index) {
        for (let i = 0; i < combiner(card_number[index]).length; i++) {
            if (check(combiner(card_number[index])[i])) {
                $(this).append(combiner(card_number[index])[i] + "<br/>")
            }
        }
    })
}