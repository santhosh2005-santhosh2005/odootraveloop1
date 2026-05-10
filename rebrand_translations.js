import fs from 'fs';
import path from 'path';

const translationsDir = 'c:/Users/santh/Downloads/OneDrive/Desktop/odoo1.0/client/src/i18n/translations';

const files = fs.readdirSync(translationsDir);

files.forEach(file => {
  if (file.endsWith('.ts')) {
    const filePath = path.join(translationsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace names
    content = content.replace(/Trek/g, 'Trek');
    content = content.replace(/TREK/g, 'Trek');
    content = content.replace(/Santhosh/g, 'Santhosh');
    content = content.replace(/Santhoshboe/g, 'santhosh');
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
