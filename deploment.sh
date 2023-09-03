npm run build

cd ./build

git init
git add .
git commit -m 'deploy'


# 发布到
git push -f git@github.com:aaaaaa-11/pdfParsing.git master:preview

cd -

