import db from "#db/client";

export async function createTrack(name, duration_ms) {
  const sql = `
    INSERT INTO tracks
        (name, duration_ms)
    VALUES
        ($1, $2)
    RETURNING *
    `;
  const {
    rows: [track],
  } = await db.query(sql, [name, duration_ms]);
  return track;
}

export async function getTracks() {
  const sql = `
    SELECT *
    FROM tracks
    `;
  const { rows: track } = await db.query(sql);
  return track;
}

export async function getTrack(id) {
  const sql = `
  SELECT *
  FROM tracks
  WHERE id = $1
  `;
  const {
    rows: [track],
  } = await db.query(sql, [id]);
  return track;
}
