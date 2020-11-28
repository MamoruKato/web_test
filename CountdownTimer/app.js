document.addEventListener('DOMContentLoaded',()=>{
    const new_years = '1 Jan 2021';

    const p_days = document.getElementById('p_days');
    const p_hours = document.getElementById('p_hours');
    const p_minutes = document.getElementById('p_minutes');
    const p_seconds = document.getElementById('p_seconds');
    
    
    function countdown()
    {
        const new_years_date = new Date(new_years);
        const current_date = new Date();
    
        const total_seconds = (new_years_date - current_date) / 1000;
        const days =  Math.floor(total_seconds / 3600 / 24 );
        const hours = Math.floor(total_seconds / 3600) % 24 ;
        const minutes = (Math.floor(total_seconds / 60)) % 60;
        const seconds = Math.floor(total_seconds % 60);
    
        p_days.innerHTML = formatTime(days); 
        p_hours.innerHTML = formatTime(hours); 
        p_minutes.innerHTML = formatTime(minutes); 
        p_seconds.innerHTML = formatTime(seconds); 

    
    }

    function formatTime(time)
    {
        return time < 10 ? (`0${time}`):time;
    }
    
    setInterval(countdown,1000);
    
})