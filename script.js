async function checkTodayExercise() {
    try {
        const username = 'moudjane';
        const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
        const data = await response.json();

        document.getElementById('username').textContent = `Pseudo : ${username}`;

        const submissionCalendar = data.submissionCalendar;
        const streak = calculateStreak(submissionCalendar);
        document.getElementById('streak').textContent = `Streak actuelle : ${streak} jours`;

        const timestamps = Object.keys(submissionCalendar).map(ts => parseInt(ts));
        const submissionDates = timestamps.map(ts => new Date(ts * 1000));
        const today = new Date();
        const lastSubmission = submissionDates[submissionDates.length - 1];

        const statusMessage = document.getElementById('statusMessage');

        if (today.toDateString() === lastSubmission.toDateString()) {
            statusMessage.textContent = "🎉 Bravo, machine de guerre ! Tu as fait ton exo aujourd'hui ! 💪";
            statusMessage.className = 'success';
        } else {
            statusMessage.textContent = "😱 Pas d'exo aujourd'hui... Allez, hop hop hop, on s'y met ! 😎";
            statusMessage.className = 'failure';
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        document.getElementById('statusMessage').textContent = "Erreur lors du chargement des données.";
        document.getElementById('statusMessage').className = 'failure';
    }
}

function calculateStreak(submissionCalendar) {
    const timestamps = Object.keys(submissionCalendar).map(ts => parseInt(ts));
    const submissionDates = timestamps.map(ts => new Date(ts * 1000));
    submissionDates.sort((a, b) => a - b);

    let currentStreak = 1;
    for (let i = 1; i < submissionDates.length; i++) {
        const diffDays = (submissionDates[i] - submissionDates[i - 1]) / (1000 * 60 * 60 * 24);
        if (diffDays === 1) {
            currentStreak++;
        } else {
            currentStreak = 1;
        }
    }
    return currentStreak;
}

checkTodayExercise();