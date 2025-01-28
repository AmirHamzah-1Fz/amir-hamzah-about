const menu = document.getElementById('menu');
const menuItems = document.getElementById('menuItems');
const menuItemsOverlay = document.getElementById('menuItemsOverlay');
const menuItemsOverlayTwo = document.getElementById('menuItemsOverlayTwo');
const home = document.getElementById('home');
const about = document.getElementById('about');

// Preload images
const imageCache = {};
const imagesToPreload = [
  '../assets/ui/menu-double.svg',
  '../assets/ui/home.svg',
  '../assets/ui/user.svg',
  '../assets/ui/folder.svg',
  '../assets/ui/mail.svg',
  '../assets/ui/chat.svg',
  '../assets/img/Meee.JPG',
  '../assets/audio/sfx/notification.mp3',
  // Add more images as needed
];

imagesToPreload.forEach((src) => {
  const img = new Image();
  img.src = src;
  imageCache[src] = img;
});

function showMenuItems() {
  menuItems.classList.remove('h-[0vh]');
  menuItems.classList.add('h-[100vh]');
  menuItemsOverlay.classList.remove('h-[0vh]');
  menuItemsOverlay.classList.add('h-[100vh]');
  menuItemsOverlayTwo.classList.remove('h-[0vh]');
  menuItemsOverlayTwo.classList.add('h-[100vh]');
  const bloob = new Audio('../assets/audio/sfx/bloob.mp3');
  bloob.play();
  closeChatBox();

  if (menuItemsOverlay.classList.value.includes('h-[100vh]')) {
    setTimeout(() => {
      menuItemsOverlay.classList.remove('duration-500');
      menuItemsOverlay.classList.add('duration-[950ms]');
      menuItemsOverlayTwo.classList.remove('duration-700');
      menuItemsOverlayTwo.classList.add('duration-[1050ms]');
    }, 600);
  }
}

function closeMenuItems() {
  menuItems.classList.remove('h-[100vh]');
  menuItems.classList.add('h-[0vh]');
  menuItemsOverlay.classList.remove('h-[100vh]');
  menuItemsOverlay.classList.add('h-[0vh]');
  menuItemsOverlayTwo.classList.remove('h-[100vh]');
  menuItemsOverlayTwo.classList.add('h-[0vh]');
  const bloobTwo = new Audio('../assets/audio/sfx/bloob 2.mp3');
  bloobTwo.play();

  setTimeout(() => {
    menuItemsOverlay.classList.remove('duration-[950ms]');
    menuItemsOverlay.classList.add('duration-500');
    menuItemsOverlayTwo.classList.remove('duration-[1050ms]');
    menuItemsOverlayTwo.classList.add('duration-700');
  }, 100);
}

function saveTimestamp() {
  const now = new Date();
  const formattedDate = now.toLocaleString('en-ID', { month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' });
  localStorage.setItem('timestamp', formattedDate);
}

function loadTimestamp() {
  const storedTimestamp = localStorage.getItem('timestamp');
  const timestampElement = document.querySelectorAll('#currentTime');
  timestampElement.forEach((timestampElement) => {
    timestampElement.textContent = storedTimestamp;
  });
}

saveTimestamp();
loadTimestamp();

menu.addEventListener('click', () => {
  showMenuItems();
});
menuItems.addEventListener('click', () => {
  closeMenuItems();
});

// LEFT NAVBAR

// BOTTOM BAR

const chatBtn = document.getElementById('chatBtn');
const chatBox = document.getElementById('chatBox');
const closeNotificationBox = document.getElementById('closeNotificationBox');
const notificationBox = document.getElementById('notificationBox');
const notificationBullet = document.getElementById('notificationBullet');

function openChatBox() {
  chatBox.classList.remove('h-[0px]');
  chatBox.classList.add('h-[350px]');
  chatBox.classList.remove('-bottom-32');
  chatBox.classList.add('bottom-0');
  const bloob = new Audio('../assets/audio/sfx/bloob.mp3');
  bloob.play();
}

function closeChatBox() {
  chatBox.classList.remove('h-[350px]');
  chatBox.classList.add('h-[0px]');
  chatBox.classList.remove('bottom-0');
  chatBox.classList.add('-bottom-32');
}

function closeChatBtn() {
  chatBtn.classList.remove('bottom-0');
  chatBtn.classList.add('-bottom-32');
}

function openChatBtn() {
  chatBtn.classList.remove('-bottom-32');
  chatBtn.classList.add('bottom-0');
}

function hideNotificationBullet() {
  notificationBullet.classList.remove('opacity-100');
  notificationBullet.classList.add('opacity-0');
}

function showNotificationBox() {
  notificationBox.classList.remove('-bottom-32');
  notificationBox.classList.add('bottom-0');
}

function closeNotificationBoxes() {
  notificationBox.classList.remove('bottom-0');
  notificationBox.classList.add('-bottom-32');
}

let splashInterval;
let durationInterval;

function playSound() {
  const sound = new Audio('../assets/audio/sfx/notification.mp3');
  sound.play();
}

window.addEventListener('load', function () {
  playSound();
});

function revealSplashNotificationBox() {
  splashInterval = setInterval(() => {
    showNotificationBox();
    durationInterval = setInterval(() => {
      if (notificationBox.classList.value.includes('bottom-0')) {
        notificationBox.classList.remove('duration-[1050ms]');
        notificationBox.classList.add('duration-[400ms]');
      }
    }, 600);
  }, 1000);
}

let splashIntervalBtn;
let durationIntervalBtn;

function revealSplashChatBtn() {
  splashIntervalBtn = setInterval(() => {
    openChatBtn();
    durationIntervalBtn = setInterval(() => {
      if (chatBtn.classList.value.includes('bottom-0')) {
        chatBtn.classList.remove('duration-[900ms]');
        chatBtn.classList.add('duration-[500ms]');
      }
    }, 600);
  }, 800);
}

revealSplashChatBtn();
revealSplashNotificationBox();

closeNotificationBox.addEventListener('click', () => {
  closeNotificationBoxes();
  clearInterval(splashInterval);
  clearInterval(durationInterval);
});

closeNotificationBox.addEventListener('click', () => {
  closeNotificationBoxes();
});

chatBtn.addEventListener('click', () => {
  openChatBox();
  closeChatBtn();
  hideNotificationBullet();
  closeNotificationBoxes();
  clearInterval(splashIntervalBtn);
  clearInterval(durationIntervalBtn);
  clearInterval(splashInterval);
  clearInterval(durationInterval);

  setInterval(() => {
    if (chatBtn.classList.value.includes('-bottom-32')) {
      chatBtn.classList.add('hidden');
      notificationBox.classList.add('hidden');
    }
  }, 300);
  setInterval(() => {
    if (chatBtn.classList.value.includes('hidden')) {
      chatBtn.classList.remove('hidden');
    }
  }, 100);

  const navTop = document.getElementById('navbarTop');
  const navLeft = document.getElementById('navbarLeft');

  document.body.addEventListener('click', function (e) {
    if (!chatBox.contains(e.target) && !chatBtn.contains(e.target) && !navTop.contains(e.target) && !navLeft.contains(e.target)) {
      closeChatBox();
      openChatBtn();
    }
  });

  this.addEventListener('scroll', function () {
    closeChatBox();
    openChatBtn();
  });
});

const closeChatBoxTop = document.getElementById('closeChatBoxTop');
closeChatBoxTop.addEventListener('click', () => {
  closeChatBox();
  openChatBtn();
  const bloobTwo = new Audio('../assets/audio/sfx/bloob 2.mp3');
  bloobTwo.play();
});
