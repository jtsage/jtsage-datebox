find ./ -name '*.po' | xargs perl -i -npe 's/^"Plural-Forms: .+$//' 
