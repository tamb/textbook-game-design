export const PLACE_KEY = "practice-range-place-v1";
export const SESSION_KEY = "practice-range-session";

/** Headings, parts, tools, glossary entries, and review questions that count as a reading position. */
export const SECTION_SELECTOR = [
  "main h2[id]",
  "main section[id]",
  "main fieldset[id]",
  "main .glossary-group div[id]",
].join(", ");

const SECTION_RE = /^[A-Za-z][A-Za-z0-9_-]{0,96}$/;

const PATH_RES: readonly RegExp[] = [
  /^\/$/,
  /^\/introduction\/$/,
  /^\/tools\/$/,
  /^\/glossary\/$/,
  /^\/progress\/$/,
  /^\/learn\/[a-z0-9-]+\/$/,
  /^\/quiz\/[a-z0-9-]+\/$/,
];

export type Place = {
  path: string;
  section: string | null;
};

export function isPlaceSection(section: string): boolean {
  return SECTION_RE.test(section);
}

function isPlacePath(path: string): boolean {
  return PATH_RES.some((pattern) => pattern.test(path));
}

export function canonicalPlace(pathname: string, section: string | null | undefined): Place | null {
  let path = pathname || "/";
  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1 && !path.endsWith("/")) path = `${path}/`;
  if (path === "/logbook/") path = "/progress/";
  if (path === "/bench/") path = "/tools/";
  if (!isPlacePath(path)) return null;
  const clean = section && isPlaceSection(section) ? section : null;
  return { path, section: clean };
}

export function parsePlace(raw: string | null | undefined): Place | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Partial<Place> | null;
    if (!data || typeof data !== "object" || Array.isArray(data)) return null;
    return canonicalPlace(typeof data.path === "string" ? data.path : "", typeof data.section === "string" ? data.section : null);
  } catch {
    return null;
  }
}

export function serializePlace(place: Place): string {
  return JSON.stringify({ path: place.path, section: place.section });
}

/** Absolute path (including basePath) plus hash. Empty when there is nothing to restore. */
export function resumeHref(place: Place, basePath = ""): string {
  const safe = canonicalPlace(place.path, place.section);
  if (!safe) return "";
  if (safe.path === "/" && !safe.section) return "";
  const base = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  return `${base}${safe.path}${safe.section ? `#${safe.section}` : ""}`;
}

/**
 * Runs before paint when the installed app opens its start URL.
 * `?source=pwa` is only on the manifest start_url, so an in-app visit to Contents is left alone.
 * A standalone reload of the same page restores the section when the address has no hash.
 */
export function resumeBootScript(basePath = ""): string {
  const base = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  const paths = PATH_RES.map((pattern) => pattern.toString()).join(",");
  return `!(function(window){
try{
var PLACE_KEY=${JSON.stringify(PLACE_KEY)};
var SESSION_KEY=${JSON.stringify(SESSION_KEY)};
var BASE=${JSON.stringify(base)};
var PATHS=[${paths}];
var SECTION_RE=${SECTION_RE.toString()};
function isPath(path){for(var i=0;i<PATHS.length;i++){if(PATHS[i].test(path))return true;}return false;}
function relativePath(pathname){
  var path=pathname||"/";
  if(BASE){
    if(path===BASE)path="/";
    else if(path.indexOf(BASE+"/")===0)path=path.slice(BASE.length);
  }
  if(!path)path="/";
  if(path.charAt(0)!=="/")path="/"+path;
  if(path.length>1&&path.charAt(path.length-1)!=="/")path+="/";
  return path;
}
function targetFor(place){
  if(!place||typeof place.path!=="string")return "";
  var path=place.path;
  if(path==="/logbook/")path="/progress/";
  if(path==="/bench/")path="/tools/";
  if(!isPath(path))return "";
  var section="";
  if(typeof place.section==="string"&&SECTION_RE.test(place.section))section=place.section;
  if(path==="/"&&!section)return "";
  return BASE+path+(section?"#"+section:"");
}
var location=window.location;
if(!location||typeof location.replace!=="function")return;
try{if((location.hash||"").length>1&&document.documentElement)document.documentElement.style.scrollBehavior="auto";}catch(e){}
var launched=false;
try{launched=new URLSearchParams(location.search).get("source")==="pwa";}catch(e){}
var standalone=false;
try{
  var queries=["(display-mode: standalone)","(display-mode: fullscreen)","(display-mode: window-controls-overlay)"];
  for(var q=0;q<queries.length;q++){
    if(window.matchMedia&&window.matchMedia(queries[q]).matches)standalone=true;
  }
  if(window.navigator&&window.navigator.standalone===true)standalone=true;
}catch(e){}
var fresh=false;
try{
  fresh=window.sessionStorage.getItem(SESSION_KEY)!=="1";
  window.sessionStorage.setItem(SESSION_KEY,"1");
}catch(e){}
var rel=relativePath(location.pathname);
var place=null;
try{
  var raw=window.localStorage.getItem(PLACE_KEY);
  if(raw)place=JSON.parse(raw);
}catch(e){}
function stripLaunchQuery(){
  if(!launched||!location.search)return;
  try{window.history.replaceState(null,"",location.pathname+(location.hash||""));}catch(e){}
}
var openingHome=rel==="/"&&(launched||(standalone&&fresh));
var hash=location.hash||"";
var restoreSection=standalone&&hash.length<2&&place&&place.path===rel&&typeof place.section==="string"&&place.section.length>0;
if(!openingHome&&!restoreSection){stripLaunchQuery();return;}
var target=targetFor(openingHome?place:(restoreSection?place:null));
if(!target){stripLaunchQuery();return;}
if((location.pathname+hash)===target&&!location.search)return;
var hashIndex=target.indexOf("#");
var nextPath=hashIndex===-1?target:target.slice(0,hashIndex);
if(nextPath!==location.pathname)window.__resumeHold=true;
location.replace(target);
}catch(e){}
})(window);`;
}
