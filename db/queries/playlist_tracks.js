import db from "#db/client";

export async function createPlaylistWithTracks(playlistId, trackId) {
  const sql = `
    INSERT INTO playlists_tracks
        (playlist_id, track_id)
    VALUES
        ($1, $2)
    RETURNING *
    `;
  const {
    rows: [playlistWithTrack],
  } = await db.query(sql, [playlistId, trackId]);
  return playlistWithTrack;
}

export async function getPlaylistTracks() {}

export async function getPlaylistTrack() {}
