'use strict';

const animalArray = [];

function Animal(animalObj) {
  this.image_url = animalObj.image_url;
  this.title = animalObj.title;
  this.description = animalObj.description;
  this.keyword = animalObj.keyword;
  this.horns = animalObj.horns;

  animalArray.push(this);
}

Animal.prototype.render = function () {
  // make a template
  const myTemplate = $('#animal-template').html();

  // make a new section
  const $newSection = $('<section></section>');

  // put the template html into my new section
  $newSection.html(myTemplate);

  // find the h2 and fill it with the name
  $newSection.find('h2').text(this.title);

  // find the h3 tag and fill with horn
  $newSection.find('h3').text('This animal has ' + this.horns + ' horn/horns.');

  // find the img and fill the src and alt
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.title);

  // find the p tag and fill with description
  $newSection.find('p').text(this.description);

  $('main').append($newSection);
}

$(document).ready($.get('data/page-1.json', data => {
  data.forEach(animal => {
    new Animal(animal).render();
  });
})
);

// add listener to every object
// its callback would check its value against every object's keyword in the json data
$('optgroup option').on('click', function (event) {

  const tempArray = [];
  animalArray.forEach(animal => {
    if (this.value === animal.keyword) {
      tempArray.push(animal);
    }
  });
  // clear all the images
  $('main').empty();
  // display only matching images
  tempArray.render();
});
