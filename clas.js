var answeredArray = new Array(10);          //答えたかどうか。ラジオボタン無効に。
var detAnsweredArray = new Array(10);       //答えの結果 0 が外れ
var resultElementArray = new Array(10);     //idを保存。答え表示用。
var correctNumber = 0;                      //正解の数
var responseNumber = 0;                     //回答した数

window.addEventListener('DOMContentLoaded', function() {
    answeredArray.fill(false);
    detAnsweredArray.fill(100);
    for(var i = 0; i < 10; i++) {
        // i とresult〇の値は異なるので注意
        resultElementArray[i] = document.getElementById(`result${i + 1}`);
    }
    checkAnswer('answer8');
    console.log(`管理人です。\nこんなところまで見ていただき恐縮です<^^>。\n何かヒントになれば幸いです。`);
});

function checkAnswer(answerName) {
    var resultElement; //id保存temp
    var correctAnswer; //正しい答えtemp
    var answers = {
        'answer1': { resultElementIndex: 0, correctAnswer: 'B' },
        'answer2': { resultElementIndex: 1, correctAnswer: 'E' },
        'answer3': { resultElementIndex: 2, correctAnswer: 'I' },
        'answer4': { resultElementIndex: 3, correctAnswer: 'L' },
        'answer5': { resultElementIndex: 4, correctAnswer: 'N' },
        'answer6': { resultElementIndex: 5, correctAnswer: 'R' },
        'answer7': { resultElementIndex: 6, correctAnswer: 'S' },
        'answer8': { resultElementIndex: 7, correctAnswer: 'W' }
    }

    var index = answers[answerName].resultElementIndex;
    var correctAnswer = answers[answerName].correctAnswer;

    if (!answeredArray[index]) {
        resultElement = resultElementArray[index];
        answeredArray[index] = true;
    } else {
        return; // すでに回答済みの場合は何もしない
    }

    //選択されているラジオボタンを見つける、テンプレートリテラル。
    var answer = document.querySelector(`input[name="${answerName}"]:checked`);

    if (answer) {
        document.getElementById(`result${index + 1}`).style.color = "black";
        var userAnswer = answer.value;

        //正誤判定
        responseNumber++;
        if (userAnswer === correctAnswer) {
            resultElement.textContent = `正解です。`;
            detAnsweredArray[index] = 1;
            correctNumber++;
        } else {
            resultElement.textContent = `不正解です。正解は ${correctAnswer} です。`;
            detAnsweredArray[index] = 0;
        }

        //解説
        switch (index) {
            case 0:
                resultElement.innerText += `\nレム睡眠では脳が活発に活動しており記憶の整理や定着が行われています。Aの選択肢はノンレム睡眠の特徴です。\nP40の左の⓶にあります。`;
                break;

            case 1:
                resultElement.innerText += `\nDの虞は「おそれ」と読み、Fの虜は「とりこ」と読みます。答えの虚は「すっかり、全く、全部」等の意味を表すそうです。\nP40の本文にあります。`;
                break;

            case 2:
                resultElement.innerText += `\n生活習慣病は「食習慣、運動習慣、休養、喫煙、飲酒などの生活習慣が、その発症・進行に関与する疾患群」と定義されています。\nそのため骨折は異なります。`;
                break;

            case 3:
                resultElement.innerText += `\nKは「変動が小さくなり」の部分が違います。正しくは大きくなります。\nP40の図2にあります。`;
                break;

            case 4:
                resultElement.innerText += `\n不眠症は具体的な数値で定義されていません。「夜間の不眠が続く」「日中に不調を自覚し生活の質が低下する」このことが認められると不眠症と診断されます。`;
                break;

            case 5:
                resultElement.innerText += `\n人間の脳は光の刺激で「セロトニン」を合成し、夜になるとそれが睡眠ホルモンと呼ばれている「メラトニン」になります。日照時間が少なくなり、セロトニンの量が少なくなることで睡眠時間が長くなります。`;
                break;

            case 6:
                resultElement.innerText += `\n教科書では口絵10にあります(始めのほう)。`;
                resultElement.innerText += `また、詳しい内容を厚労省がインターネットに載せています。\n`;

                var linkElement = document.createElement("a");
                linkElement.href = "https://www.mhlw.go.jp/file/06-Seisakujouhou-10900000-Kenkoukyoku/0000047221.pdf";
                linkElement.textContent = "厚労省のリンク";
                linkElement.setAttribute("target", "_blank");
                resultElement.appendChild(linkElement);
                break;

            case 7:
                resultElement.innerText += `\n日本の有給消化率は56.6%と低くなっています。その理由として、職場の雰囲気や他人へ迷惑をかけてしまうというのが多いそうです。`;
                break;

            default:
                console.log('error_switch-case');
                break;
        }

        //ボタンを無効化
        var radioButtons = document.querySelectorAll('input[name="' + answerName + '"]');
        for (var i = 0; i < radioButtons.length; i++) {
            radioButtons[i].disabled = true;
        }

    } else {
        resultElement.textContent = '選択してください...';
        //色変更
        document.getElementById(`result${index + 1}`).style.color = "rgb(194, 2, 2";
        //ボタン復活
        answeredArray[index] = false;
    }

    var problems = document.querySelectorAll('.pro1, .pro2, .pro3, .pro4, .pro5, .pro6, .pro7, .pro8');
    /*この構文スクショあり。*/
    problems.forEach((problem, index) =>{
        //spanがあると削除
        if (problem.querySelector('span')) {
            problem.querySelector('span').remove();
        }

        const boolElement = document.createElement('span'); //spanを追加
        /* boolElement.textContent = answeredArray[index]?'済':'未回答'; 三項演算子でも一緒 */
        /*多分 detAnsweredArray一つでansweredArrayなくていける。いつか修正したい。*/
        if (answeredArray[index]) {
            if (detAnsweredArray[index] == 0) {
                boolElement.textContent = '不正解';
            } else if (detAnsweredArray[index] == 1) {
                boolElement.textContent = '正解!!';
            }
            boolElement.classList.add('black');

        } else {
            boolElement.textContent = '未回答';
            boolElement.classList.add('brightRed');
        }

        problem.appendChild(boolElement);
    });

    //正解の数を表示
    if (responseNumber === 8) {
        document.getElementById("score").textContent = correctNumber * 12.5;
        if (correctNumber === 8) special();
        display();
        jump();
    }
    return;
}

//未回答へジャンプする
function jump() {
    var i = 0;
    for (i = 0; i < 8; i++) {
        if (!answeredArray[i]) break;
    }

    var nameID = `quiz_${i + 1}`

    if (i == 8) {
        nameID = 'Result';
    }

    var jumpTargetElement = document.getElementById(nameID);
    jumpTargetElement.scrollIntoView({ behavior: 'smooth' });
    return;
}

//結果画面を表示
function display() {
    var hiddenElement = document.getElementById('Result');
    hiddenElement.style.display = 'block';
}

function special() {
    var specialElement = document.getElementById('special');
    specialElement.style.display = 'block';
}

function messageSpe() {
    alert("全問正解おめでとうございます。\nｷﾀ━━━━━━━━━━━━(ﾟ∀ﾟ)━━━━━━━━━━━!!")
}
