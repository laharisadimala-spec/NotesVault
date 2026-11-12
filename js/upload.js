// Upload form: validation, metadata saved to localStorage
const ALLOWED = {"application/pdf":"PDF","image/png":"PNG","image/jpeg":"JPG"};
const MAX_MB = 5;

function validate(form){
  let ok = true;
  form.querySelectorAll("[data-req]").forEach(el => {
    const err = el.parentElement.querySelector(".err");
    const bad = !el.value.trim();
    err.textContent = bad ? "This field is required" : ""; if (bad) ok = false;
  });
  const file = form.file.files[0], ferr = document.getElementById("fileErr");
  ferr.textContent = "";
  if (!file) { ferr.textContent = "Please choose a file"; ok = false; }
  else if (!ALLOWED[file.type]) { ferr.textContent = "Only PDF, PNG or JPG files are allowed"; ok = false; }
  else if (file.size > MAX_MB * 1024 * 1024) { ferr.textContent = `File must be under ${MAX_MB} MB`; ok = false; }
  return ok;
}
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uploadForm");
  form.subject.innerHTML = `<option value="">Select subject</option>` + SUBJECTS.map(s => `<option>${s}</option>`).join("");
  form.onsubmit = e => {
    e.preventDefault();
    if (!validate(form)) return toast("Please fix the highlighted fields", true);
    const f = form.file.files[0], id = "u" + Date.now();
    const meta = {
      id, title: form.title.value.trim(), university: form.university.value.trim(),
      college: form.college.value.trim(), branch: form.branch.value, year: form.year.value,
      semester: form.semester.value, subject: form.subject.value, unit: form.unit.value,
      description: form.description.value.trim(), type: ALLOWED[f.type], fileName: f.name,
      date: new Date().toISOString().slice(0,10), contributor: "Lahari", downloads: 0, rating: 0,
      status: "pending"
    };
    const list = getUploads(); list.push(meta); save(KEY.uploads, list);
    document.getElementById("successBox").style.display = "block";
    toast("Upload submitted for review ✓");
    form.reset();
  };
  document.getElementById("fileInput").onchange = e => {
    const f = e.target.files[0];
    document.querySelector("#dropzone span").textContent = f ? f.name : "Click to choose a PDF or image";
  };
});
