// Get data from source and assign to objects
let samples;
let metadata;

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url)
   .then(data => {
      samples = data.samples;
      metadata = data.metadata;
      console.log("Loaded samples data:", samples);
      console.log("Loaded metadata data:", metadata);
      populateDropdown();
   })
   .catch(error => console.error("Error fetching data:", error));

// Function to populate the dropdown 
function populateDropdown() {
   if (!samples) {
      console.error("Samples data is undefined.");
      return;
   }

   const dropdown = document.getElementById('selDataset');
   dropdown.innerHTML = '';
   const defaultOption = document.createElement('option'); 
   defaultOption.text = 'Select ID'; 
   dropdown.add(defaultOption);

   samples.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id.toString(); 
      option.text = `ID ${item.id}`;
      dropdown.add(option);
   });
}

// Function to get samples by sample ID
function getSampleData(sampleID) {
   return samples.find(item => Number(item.id) === Number(sampleID)); 
}

// Function to get metadata by sample ID
function getMetadata(sampleID) {
   return metadata.find(item => Number(item.id) === Number(sampleID));
}

// Function to update div objects when ID is selected
function optionChanged(selectedValue) {
   let sampleData;  
   console.log("Selected value:", selectedValue);
   sampleData = getSampleData(selectedValue);

   if (sampleData) {
      updateBarChart(sampleData.id);
      updateBubbleChart(sampleData);
      updateDemographicInfo(getMetadata(sampleData.id));
   }
}

//Bar Chart function 
function updateBarChart(selectedValue) {
   console.log("Selected value:", selectedValue);
   const sampleData = getSampleData(selectedValue);

    if (sampleData) {
      let topValues = sampleData.sample_values.slice(0, 10).reverse();
      let otu_ids_labels = sampleData.otu_ids.slice(0, 10).map(id => `OTU: ${id}`);
     
     
      let bartrace = {
         x: topValues,
         y: otu_ids_labels,
         type: 'bar', 
         orientation: 'h', 
         text: sampleData.otu_labels, 
         marker: { 
            color: 'rgb(190, 77, 37, 1)'
         } 
      };
      let layout = {
         xaxis: { categoryorder: 'total ascending'}
      };
      let bardata = [bartrace]
      Plotly.newPlot("bar", bardata, layout);
      }
}

// Demographic info function
function updateDemographicInfo(metadata) {
   console.log("Updating demographic info...");
   const metadataDiv = document.getElementById('sample-metadata');
   console.log("Metadata Div:", metadataDiv);

   if (metadataDiv) {
      metadataDiv.innerHTML = '';

      if (metadata) {
         console.log("Metadata:", metadata);

         Object.entries(metadata).forEach(([key, value]) => {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${key}:</strong> ${value}`;
            metadataDiv.appendChild(p);
         });
      } else {
         console.error("Metadata is null or undefined in the sample data.");
      }
   } else {
      console.error("Element with ID 'sample-metadata' not found");
   }
}
// Bubblechart function     
function updateBubbleChart(sampleData) {

   let bubbletrace = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: 'markers',
      marker: {
         color: sampleData.otu_ids,  
         size: sampleData.sample_values,
         opacity: 1.0
      }
   };

   console.log("Bubble Trace:", bubbletrace);

   let bubbledata = [bubbletrace];

   let bubbleElement = document.getElementById("bubble");

   if (bubbleElement) {
      Plotly.react("bubble", bubbledata);
   } else {
      console.error("Element with ID 'bubble' not found.");
   }
}
      
