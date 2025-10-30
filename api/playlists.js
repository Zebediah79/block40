import express from "express";
const router = express.Router();
export default router;

import {
  getPlaylists,
  getPlaylist,
  createPlaylist,
} from "#db/queries/playlists";
import {
  getPlaylistTrack,
  getPlaylistTracks,
} from "#db/queries/playlist_tracks";

router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylist(id);
  if (!playlist) return res.status(404).send("Playlist not found.");
  console.log(playlist);
  req.playlist = playlist;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.playlist);
});
