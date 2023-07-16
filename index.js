const hasForm = ({ headers }) =>
  (headers["content-type"] || "").includes("multipart/form-data");

function invoke(o, k, v) {
  if (o[k] !== void 0) {
    if (!Array.isArray(o[k])) o[k] = [o[k]];
    o[k].push(v);
  } else o[k] = v;
}
async function parse(req) {
  const o = {}, p = {};
  if (!hasForm(req)) return [o, p];
  (await new Request("http://x.x/", {
    method: "POST",
    headers: req.headers,
    body: await new Promise((ok, no) => {
      const c = [];
      req.on("data", (b) => c.push(b))
        .on("end", () => ok(Buffer.concat(c)))
        .on("error", (e) => no(e));
    }),
  }).formData()).forEach((v, k) => {
    if (typeof v.arrayBuffer === "function") invoke(p, k, v);
    else invoke(o, k, v);
  });
  return [o, p];
}
module.exports = { parse, hasForm };
