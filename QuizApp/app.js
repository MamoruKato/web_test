document.addEventListener('DOMContentLoaded',()=>{
    const quiz_data = [
        {
            question: "What year did the Titanic sink in the Atlantic Ocean on 15 April, on its maiden voyage from Southampton ?",
            a:"1925",
            b:"1849",
            c:"1912",
            d:"1760",
            correct:"c"
        
        },
        {
            question: "What is the name of the biggest technology company in South Korea ?",
            a:"LG",
            b:"Samsung",
            c:"Asus",
            d:"Xiaomi",
            correct:"b"
        
        },
        {
            question: "What is the chemical symbol for silver?",
            a:"Cu",
            b:"Zn",
            c:"Ag",
            d:"Au",
            correct:"d"
        
        },
        {
            question: "Which year was the first Tonka truck made ?",
            a:"1947",
            b:"1965",
            c:"1933",
            d:"1990",
            correct:"a"
        
        }
    ]
    
    const quiz = document.getElementById("quiz");
    const question = document.getElementById("question");
    const a_text = document.getElementById("a_text");
    const b_text = document.getElementById("b_text");
    const c_text = document.getElementById("c_text");
    const d_text = document.getElementById("d_text");



    const next_btn = document.getElementById("next-btn");

    let current_question = 0;
    let score = 0;

    load_quiz();

    function load_quiz()
    {

        const answers_els = document.querySelectorAll(".answer");
        answers_els.forEach(answer => {
            answer.checked = false;
        })
        
        question.innerText = quiz_data[current_question]["question"];
        a_text.innerText = quiz_data[current_question]["a"];
        b_text.innerText = quiz_data[current_question]["b"];
        c_text.innerText = quiz_data[current_question]["c"];
        d_text.innerText = quiz_data[current_question]["d"];

    }

    function get_selected()
    {
        const answers_els = document.querySelectorAll(".answer");
        let answer = undefined;

        answers_els.forEach(answer_el => {

            if(answer_el.checked)
            {
                answer = answer_el.id; 
                return answer;
            }
        })

        return answer;
    }

    next_btn.addEventListener("click", () =>{
        let answer = get_selected();

        function validate_answer()
        {
            if(answer)
            {
                if(answer == quiz_data[current_question]["correct"])
                {
                    score++;
                }
                current_question ++;
            }
        }
        if(current_question < quiz_data.length - 1 )
        {            
            validate_answer();
        }
        else
        {
            validate_answer();
            quiz.innerHTML = `<h2> You Scored: ${score}/${quiz_data.length} </h2> <button onClick="location.reload()">Reload</button>`;
            current_question = 0;
            score = 0;

        }

        load_quiz();
    } )

})