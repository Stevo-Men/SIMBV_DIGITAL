import fs from 'fs';
import path from 'path';
import Soundcloud from 'soundcloud.ts';

const soundcloud = new Soundcloud.default();
const ARTIST_PROFILE_URL = 'https://soundcloud.com/simbvmusic';
const OUTPUT_FILE = path.resolve('src/data/tracks.json');
const OUTPUT_DIR = path.dirname(OUTPUT_FILE);

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function fetchTracks() {
    console.log(`Fetching tracks from ${ARTIST_PROFILE_URL}...`);
    try {
        const user = await soundcloud.users.get(ARTIST_PROFILE_URL);

        // Fetch tracks
        // pagination might be needed for *all* tracks, but let's start with basic fetch
        // usually users.tracks gives a list or paginated response
        const tracksGenerator = await soundcloud.users.tracks(user.id);

        const allTracks = [];
        // tracksGenerator is indeed a generator or array depending on implementation
        // soundcloud.ts documentation says `tracks` returns `Promise<SoundcloudTrackV2[]>` for simple usage or V2 often returns collections
        // Let's assume it returns an array for now, or check response structure.
        // Actually, looking at typical usage of this lib:
        // const tracks = await soundcloud.users.tracks(userId); 

        // However, I need to be careful about pagination if they have many tracks.
        // For now, let's grab what we get.

        // NOTE: soundcloud.ts might default to valid limits.

        const text = [];

        // To be safe, let's inspect what we get
        const tracks = tracksGenerator; // await was already used above if it's async

        console.log(`Found ${tracks.length} tracks.`);

        const mappedTracks = tracks.map(track => ({
            id: track.id,
            title: track.title,
            image: track.artwork_url ? track.artwork_url.replace('-large', '-t500x500') : null, // Get higher quality image
            url: track.permalink_url,
            duration: track.duration,
            createdAt: track.created_at,
            genre: track.genre,
            streamUrl: track.stream_url // Might be useful if we want to play it (with client_id)
        }));

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mappedTracks, null, 2));
        console.log(`Successfully saved ${mappedTracks.length} tracks to ${OUTPUT_FILE}`);
    } catch (error) {
        console.error('Error fetching tracks:', error);
        // process.exit(1); 
        // Failing gracefully might be better? No, fail loud in CI/build
        process.exit(1);
    }
}

fetchTracks();
