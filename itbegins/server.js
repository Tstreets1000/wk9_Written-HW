const express = require('express')
const fs = require('fs')
// Imported the express package using require
// This only works because we added express with npm i express

const app = express()
// then we used express to make the app opject

app.set('view engine', 'donna')
app.set('views', './views')


app.engine('donna', (filePath, options, callback) => {
    //readFile 
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err)
          // then parse in our data in the templated locations in the html
          const rendered = content.toString()
              .replace('#title#', `<title>${options.title}</title>`)
              .replace('#message#', `<h1>${options.message}</h1>`)
              .replace('#content#', `<div>${Array.isArray(options.content)? 
                  options.content.map(item => `<li>${item}</li>`).join('') :
                  (options.content)}</div>`)

              // return the complete
              return callback(null, rendered)
    })
   
    
})
//======== Routes Start Here =============//

app.get('/', (req, res) => {
  res.render('template', { title: 'I am DJ Khaled', message: 'We The Best!', content: 'All I Do is Win' })
})

app.get('/about-me', (req, res) => {
  res.render('template', { title: 'DJ KHALED', message: 'It Breaks My Heart!', content: 'They Ain\'t Believe in Us But God Did' })
})

app.get('/another-one', (req, res) => {
  res.render('template', { title: 'We The Best', message: 'Who The Best! We!!!', content: ['We Taking Over', 'Major Key Alert', 'Y\'all know who it is', 'All I do is win, God Did!!!'] })
})

//==========Routes End Here =============//

app.listen(3000, () => { // Listen method always go last
    console.log('Yes I am listening on port 3000')
})

