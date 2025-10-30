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

export async function getPlaylistTracks(id) {
  const sql = `
  SELECT tracks.*
  FROM playlists_tracks
  JOIN playlists ON playlists_tracks.playlist_id = playlists.id
  JOIN tracks ON playlists_tracks.track_id = tracks.id
  WHERE playlists.id = $1
  `;
  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
}
