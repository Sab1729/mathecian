document.addEventListener("DOMContentLoaded", function() {
    var questions = document.querySelectorAll('.question');

    questions.forEach(function(question) {
        var questionText = question.getAttribute('data-question-text');
        var questionMath = question.getAttribute('data-question-math');
        var solutionText = question.getAttribute('data-solution');

        // Set question text
        var questionTextElement = question.querySelector('.question-text');
        questionTextElement.innerHTML = questionText;

        // Render and set math expression with MathJax
        var questionMathElement = question.querySelector('.question-math');
        questionMathElement.innerHTML = questionMath;

        // Store LaTeX solution in a data attribute for later use
        var solutionElement = question.querySelector('.solution');
        solutionElement.setAttribute('data-solution-tex', solutionText);
    });

    // Re-render MathJax to process newly added LaTeX
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
});

// Function to handle showing and hiding solutions
function showSolution(button) {
    var solutionElement = button.nextElementSibling;
    var solutionTex = solutionElement.getAttribute('data-solution-tex');

    // Split the solution into text and LaTeX math (if any)
    var solutionParts = solutionTex.split(/(\$[^$]+\$)/g);  // Split around inline LaTeX
    
    // Build the solution HTML, keeping plain text and LaTeX separate
    var formattedSolution = solutionParts.map(function(part) {
        if (part.match(/\$[^$]+\$/)) {
            // This part is LaTeX, render it with MathJax
            return "$$" + part.replace(/\$/g, "") + "$$";
        } else {
            // This part is plain text, keep it as is
            return part;
        }
    }).join('');

    // Toggle visibility of solution
    if (solutionElement.style.display === "none" || solutionElement.style.display === "") {
        solutionElement.style.display = "block";  // Show solution
        solutionElement.innerHTML = formattedSolution;  // Insert formatted solution
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);  // Re-render MathJax for new LaTeX content
    } else {
        solutionElement.style.display = "none";  // Hide solution
    }
}
