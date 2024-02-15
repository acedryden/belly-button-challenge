// Read samples data 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let samples_raw = d3.json(url).then(data => console.log(data))
samples = Array.from(samples_raw)

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual: 
let bartrace = { 
     x: samples.map( item => item.sample_values),  
     y: samples.map( item => item.otu_ids),  
     type: 'bar' //otu_labels = hovertext 
 }
  let bardata = [bartrace]
 Plotly.newPlot("bar", bardata)

 //Create a bubble chart that displays each sample: 
 //
 let bubbletrace = {
    x: samples.map( item => item.otu_ids),
    y: samples.map( item => item.sample_values),
    //marker_size: samples.sample_values 
 //marker_colors: samples.otu_ids 
 //text values: samples.otu_labels
 }
 let bubbledata = [bubbletrace]
Plotly.newPlot("bubble", bubbledata)

// Display the sample metadata, ie an individual's demographic information 
// Display each key-value pair from the metadata JSON object somewhere on the page
//Update all the plots when a new sample is selected
function getData() {
   let dropdownMenu = d3.select("#selDataset");
   let dataset = dropdownMenu.property("value");
   let data = [];
}

   function updatePlotly(newdata) {
      Plotly.restyle("bar", "values", [newdata]);
      Plotly.restyle("bubble", "values", [newdata]);
    }
    
// Deploy your app to a free static page hosting service 