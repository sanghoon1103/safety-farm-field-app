const CACHE_NAME = 'field-app-v1';
// 인터넷 없이도 켜지도록 기기에 미리 저장(캐싱)해둘 파일 목록
const FILES_TO_CACHE = [
    './',
    './index.html',
    './manifest.json'
];

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        caches.match(evt.request).then((res) => {
            // 기기에 저장된 파일이 있으면 그걸 보여주고, 없으면 인터넷에서 가져옴
            return res || fetch(evt.request);
        })
    );
});