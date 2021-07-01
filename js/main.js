
//Elements
const loginButton = document.getElementById("login-button");
const CLIENT_ID = '4oszsglbuggv0m225pspcwcvvcdp9k';
//const HOST = window.location.hostname;
const HOST = 'https://localhost'
const loadButton = document.getElementById('load-button');
const dayButton = document.getElementById('day');
const monthButton = document.getElementById('month');
const weekButton = document.getElementById('week');
const filterButton = document.getElementById('apply-button');
const mainContent = document.getElementById('main');
const sidePanel = document.getElementById('sidebar');
const optionPanel = document.getElementById('options-panel');
const loginForm = document.getElementById('login-form');
const checkbox = document.querySelector("input[name=checkbox]");
const header = document.getElementById('main-header');
const loginLabel = document.getElementById('login-label');

var hide = true;
var isMobile = false;


var init = {method:'GET',headers: { 'client-id': CLIENT_ID, 'accept':'application/vnd.twitchtv.v5+json'}, mode: 'cors', cache: 'default'};
var userName, userID;
var clips = [];
var filter = [];
var currentClips = 0;
var period = 'day';

//bool
var started = false;
var reset = false;

//Reference for ul in sidepanel
var channelList = document.getElementById("channel-list");
var channels;

//All li elements in side panel
var items = channelList.getElementsByTagName("li");


//Streamer list buttons
var streamers = [];


//Layot during load


startLayout();

async function start(userName){
    console.log(HOST);
    await getUserId(userName);
    await getChannels();
    channels = JSON.parse(localStorage.getItem('channelNames'));
    initSidebar();
    userID = localStorage.getItem('userID');
    await getTopClips(period);
    clips = JSON.parse(localStorage.getItem('clips'));
    clips.sort(compare);
    addFrame(createFrame(clips[0], 'autoplay=true'));
    //addFrame(createFrame(clips[1], 'autoplay=false'));


 //Visibility of load button
    window.onscroll = function(ev) {
    var height = currentClips * 480;
    if ((+window.innerHeight + +window.scrollY <= height + 200 || window.scrollY < 500) && hide == true) {
        loadButton.style.display = 'none';
    }else{
        loadButton.style.display = 'block';
        }  

    }

    //Detect mobile
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
    }

    //Reszising for android, ios etc... 
    window.addEventListener('resize', function(){
        if(screen.width === window.innerWidth || isMobile ){
            sidePanel.style.position = 'fixed';
            hide = true;
            }else{
            sidePanel.style.position = 'relative';
            hide = false
            }
      });

    //Clcik event for the streamer list
    for(let i = 0; i < items.length; i++){
        streamers[i] = items[i].getElementsByTagName("input")[0];
    }
    clicked = [];
    for(let i = 0; i < streamers.length; i++){
        clicked[i] = false;
        streamers[i].addEventListener("click", function(){
            if(!clicked[i]){
                document.getElementById(streamers[i].value).style.backgroundColor = "#3D3D3D";
                clicked[i] = true;
            }else{
                document.getElementById(streamers[i].value).style.backgroundColor = "#616161";
                clicked[i] = false;
            }

            if(clicked[i] && !filter.includes(streamers[i].value)){
                filter.push(streamers[i].value);
            }else{
                if(filter.includes(streamers[i].value)){
                    const index = filter.indexOf(streamers[i].value);
                    if (index > -1) {
                        filter.splice(index, 1);
                      }
                    }
                }
        });
    }

    //select/deselect all checkbox
    checkbox.addEventListener('change', function(){
        if(this.checked){
            for(let i = 0; i < streamers.length; i++){
                document.getElementById(streamers[i].value).style.backgroundColor = "#616161";
                if(filter.includes(streamers[i].value)){
                    const index = filter.indexOf(streamers[i].value);
                    if (index > -1) {
                        filter.splice(index, 1);
                      }
                    }
            }
            for(let i = 0; i < clicked.length; i++){
                clicked[i]=false;
            }
        }
        if(!this.checked){
            for(let i = 0; i < streamers.length; i++){
                document.getElementById(streamers[i].value).style.backgroundColor = "#3D3D3D";
                filter.push(streamers[i].value);
            }
            for(let i = 0; i < clicked.length; i++){
                clicked[i]=true;
            }
        }
    });
}

//Click event for login button. Stores twitch username. 
loginButton.onclick = function(){
    if(!started){
        userName = document.getElementById("username").value;
        start(userName);
        started = true;
    }else{
        userName = document.getElementById("username").value;
        resetVars();
        start(userName);
    }
}


//Click event for load button.
loadButton.addEventListener('click', function(){
    if(currentClips < clips.length){
        for(let i = 0; i < clips.length; i ++){
            if(clips[i].played == false){
                addFrame(createFrame(clips[i], 'autoplay=true'));
                break;
            }
        }
    }else{
        window.alert('no more clips to load.');
    }
});

//Click event for filter button
filterButton.addEventListener('click', function(){    

    filterClips();
});



//Click event for options panel
dayButton.addEventListener('click', function(){
    dayButton.style.border = 'solid'
    dayButton.style.borderColor = 'silver';
    weekButton.style.border = 'none'
    monthButton.style.border = 'none'
   changePeriod('day');
});

weekButton.addEventListener('click', function(){
    weekButton.style.border = 'solid'
    weekButton.style.borderColor = 'silver';
    dayButton.style.border = 'none'
    monthButton.style.border = 'none'
    changePeriod('week');
});

monthButton.addEventListener('click', function(){
    monthButton.style.border = 'solid'
    monthButton.style.borderColor = 'silver';
    weekButton.style.border = 'none'
    dayButton.style.border = 'none'
    changePeriod('month');
});


async function getUserId(userName){

    let request = new Request('https://api.twitch.tv/kraken/users?login=' + userName,init);

    var result = fetch(request)
        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem('userID', data.users[0]._id);
        });
        return result;
}

async function getChannels(){

    let request = new Request('https://api.twitch.tv/kraken/users/' + localStorage.getItem('userID') + '/follows/channels?'+'limit=100' + '&sortby = last_broadcast', init);
    
    var result = fetch(request)
    .then(resp => resp.json())
    .then(data => {
        arr =[]; 
            for(let i = 0; i < data.follows.length; i++){
                ch = {'name':data.follows[i].channel.display_name, 'logo':data.follows[i].channel.logo, 'show':true};
                arr.push(ch);
            }
            localStorage.setItem('channelNames', JSON.stringify(arr));
        });
        return result;
}

async function getTopClips(time){
    var arr = []
    for(let i = 0; i < channels.length; i++){
        if(channels[i].show == true){
            let request = new Request(`https://api.twitch.tv/kraken/clips/top?channel=${channels[i].name}&period=${time}&trending=false&limit=15`, init);
            var result =  fetch(request)
            .then(resp => resp.json())
            .then(data => {
                for(let y = 0; y < data.clips.length; y++){
                slug = data.clips[y].slug;
                views = data.clips[y].views;
                name = data.clips[y].broadcaster.name;
                clip = {'slug':slug, 'views':views, 'name':name, 'played':false};
                arr.push(clip);
                localStorage.setItem('clips', JSON.stringify(arr));
                }
            });
        }
    }
    
    return result;
    
}


function compare(a, b){
    if(a.views < b.views){
        return 1;
    }
    if(a.views > b.views){
        return -1;
    }
    return 0;
}

function createFrame(clip, autoplay){

    if(clip.played == false && clip.slug != null){
        var ifrm = document.createElement('iframe');
        //ifrm.setAttribute('src', `https://clips.twitch.tv/embed?parent=www.clipnship.net&parent=clipnship.net&clip=${clip.slug}&${autoplay}`);
        ifrm.setAttribute('src', `https://clips.twitch.tv/embed?parent=127.0.0.1&clip=${clip.slug}&${autoplay}`);
        ifrm.setAttribute('height','460');
        ifrm.setAttribute('width','800');
        ifrm.setAttribute('frameborder','no');
        ifrm.setAttribute('scrolling','no');
        ifrm.setAttribute('muted','true');
        ifrm.setAttribute('allowfullscreen','yes');
        clip.played = true;
        return ifrm;
    }else{
        return null;
    }
}

function addFrame(iframe){
    if(currentClips < clips.length & iframe != null){
        mainContent.appendChild(iframe);
        currentClips++;
    }
}

async function initSidebar(){
    const sidebar = document.getElementById('channel-list');
    var li;
    for(let i = 0; i < channels.length; i++){
        li = document.createElement('li');
        btn = document.createElement('input');
        img = document.createElement('img');
        img.setAttribute('src', channels[i].logo);
        img.style.width = '28%';
        img.style.height = 'auto';
        btn.setAttribute('type', 'submit');
        btn.setAttribute('value', channels[i].name);
        btn.setAttribute('id', channels[i].name);
        li.setAttribute('style', 'none');
        li.appendChild(img);
        li.appendChild(btn);
        sidebar.appendChild(li);

    }

}

function resetVars(){
    localStorage.clear();
    currentClips = 0;
    document.getElementById('main').innerHTML = "";
    document.getElementById('channel-list').innerHTML = "";
}

async function changePeriod(time){
    period = time;
    filterClips();

}

async function filterClips(){
    document.getElementById('main').innerHTML = "";
    for(let i = 0; i < channels.length; i++){
        if(filter.includes(channels[i].name)){
            channels[i].show = false;
        }else{
            channels[i].show = true;
        }
    }
    await localStorage.clear();

    currentClips = 0;
    getTopClips(period);
    await new Promise(r => setTimeout(r, 500));
    clips = await JSON.parse(localStorage.getItem('clips'));
    let counter = 0;
    if(clips != null){
        for(let i = 0; i < clips.length; i++){
            if(clips[i].slug != null){
                counter++;
            }
        }
}

    if(counter > 0){
        clips.sort(compare);
        addFrame(createFrame(clips[0], 'autoplay=true'));
    }else{
        window.alert(`No clips to show!`);
    }
}

function loginLayout(){
    loadButton.style.display = 'none';
    sidePanel.style.display = 'none';
    optionPanel.style.display = 'none';
    header.style.display = 'none';

    loginForm.style.position = 'fixed'
    loginForm.style.transform = 'translateX(260%)'
    loginForm.style.top = '38%';
    loginForm.style.left = '4%';
}

function startLayout(){
    loadButton.style.display = 'none'
    header.style.display = 'block';
    sidePanel.style.display = 'block';
    optionPanel.style.display = 'block';
    loginLabel.style.display = 'block';
    dayButton.style.border = 'solid';
    loginForm.style.position = 'relative';
    loginForm.style.transform = 'translateY(-87%)';
    loginForm.style.left = '0';

}







