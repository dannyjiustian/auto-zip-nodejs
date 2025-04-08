const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const readline = require('readline-sync');

// === Step 1: Input Nama Folder ===
const baseFolder = readline.question('Masukkan nama folder yang ingin di-zip: ');

if (!fs.existsSync(baseFolder) || !fs.statSync(baseFolder).isDirectory()) {
  console.log(`Folder "${baseFolder}" tidak ditemukan!`);
  process.exit(1);
}

const tempZipFolder = 'temp_zips';
const finalZip = `${baseFolder}.zip`;

fs.ensureDirSync(tempZipFolder);

// === Step 2: Fungsi Zip File/Folder ===
function zipItem(source, outPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', resolve);
    archive.on('error', reject);

    archive.pipe(output);

    const stat = fs.statSync(source);
    if (stat.isFile()) {
      archive.file(source, { name: path.basename(source) });
    } else if (stat.isDirectory()) {
      archive.directory(source, path.basename(source));
    }

    archive.finalize();
  });
}

// === Step 3: Proses Utama ===
async function run() {
  const items = fs.readdirSync(baseFolder);

  for (const item of items) {
    const itemPath = path.join(baseFolder, item);
    const stat = fs.statSync(itemPath);
    const nameWithoutExt = path.parse(item).name;
    const zipName = `${nameWithoutExt}.zip`;
    const zipPath = path.join(tempZipFolder, zipName);
    await zipItem(itemPath, zipPath);
    console.log(`✔ Zipped: ${zipName}`);
  }

  // === Step 4: Zip Semua .zip ke Final ===
  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(finalZip);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', resolve);
    archive.on('error', reject);

    archive.pipe(output);

    fs.readdirSync(tempZipFolder).forEach(item => {
      const itemPath = path.join(tempZipFolder, item);
      archive.file(itemPath, { name: path.join(baseFolder, item) });
    });

    archive.finalize();
  });

  console.log(`\n🎉 Final zip created: ${finalZip}`);

  fs.removeSync(tempZipFolder);
}

run();
