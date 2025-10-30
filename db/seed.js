import db from "#db/client";
import { createTrack } from "#db/queries/tracks";
import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistWithTracks } from "#db/queries/playlist_tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 20; i++) {
    const range = Math.random() * (300000 - 120000) + 120000;
    const time_ms = Math.round(range);
    await createTrack("Track" + i, time_ms);
  }
  for (let i = 1; i <= 10; i++) {
    const description = `This is playlist number ${i}`;
    await createPlaylist("Playlist" + i, description);
  }
  for (let i = 1; i <= 15; i++) {
    const trackId = 1 + Math.floor(Math.random() * 20);
    const playlistId = 1 + Math.floor(Math.random() * 10);
    await createPlaylistWithTracks(playlistId, trackId);
  }
}
