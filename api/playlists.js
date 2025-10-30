import express from "express";
const router = express.Router();
export default router;

import {
  getPlaylists,
  getPlaylist,
  createPlaylist,
} from "#db/queries/playlists";
import {
  getPlaylistTracks,
  createPlaylistWithTracks,
} from "#db/queries/playlist_tracks";

router
  .get("/", async (req, res) => {
    const playlists = await getPlaylists();
    res.send(playlists);
  })
  .post("/", async (req, res) => {
    if (!req.body) return res.status(400).send("Request must have body.");

    const { name, description } = req.body;
    if (!name || !description)
      return res.status(400).send("Request body must include trackId.");
    const playlist = await createPlaylist(name, description);
    res.status(201).send(playlist);
  });

router.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id))
    return res.status(400).send("ID must be a positive integer.");

  const playlist = await getPlaylist(id);
  if (!playlist) return res.status(404).send("Playlist not found.");
  console.log(playlist);
  req.playlist = playlist;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const tracks = await getPlaylistTracks(req.playlist.id);
  if (!tracks) return res.status(404).send("No playlist with tracks found.");
  res.send(tracks);
});

router.post("/:id/tracks", async (req, res) => {
  if (!req.body) return res.status(400).send("Request must have body.");

  const { trackId } = req.body;
  if (!trackId)
    return res.status(400).send("Request body must include trackId.");

  const playlist_track = createPlaylistWithTracks(req.playlist.id, trackId);
  res.status(201).send(playlist_track);
});
