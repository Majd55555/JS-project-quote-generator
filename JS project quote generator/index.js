
/// function to create the input element
    const createInput =  (type, eClass, eName, div) => {
      const input = document.createElement('input')
      input.type = type
      input.id = eName 
      input.name = eName
      input.classList.add(eClass)
      const inputElement = div.appendChild(input)
      return inputElement
    }
    // for markups
    const slabMarkup = createInput('number','add-material-input', 'slab-markup', document.querySelector('#markup')  )
    slabMarkup.addEventListener('input', function(event){
      slabMarkupValue = event.target.value
    })
    let slabMarkupValue = ''

    // for cost of slabs
    const costPerSlab = createInput('number', 'add-material-input', 'cost-per-slab', document.querySelector('#cost-slabs'))
    costPerSlab.addEventListener('input', function(event){
      costPerSlabValue = event.target.value
    })
    let costPerSlabValue = ''

    // name of material 
    const addMaterialName = createInput('text','add-material-input', 'add-material-name-input', document.querySelector('#add-material-name')  )
    addMaterialName.addEventListener('input', function(event){
      addMaterialNameValue = event.target.value
    })
    let addMaterialNameValue = ''

    // for location 
    const locationInput = createInput('text', 'add-material-input', 'location-input', document.querySelector('#location-inputs'))
    locationInput.addEventListener('input', function(event){
      locationInputValue = event.target.value 
    }) 
    let locationInputValue = '' 

    // Number of Slabs 
    const numberOfSlabsInput = createInput('number', 'add-material-input', 'number-of-slabs', document.querySelector('#qty-of-slabs')) 
    numberOfSlabsInput.addEventListener('input', function(event){
      numberOfSlabsValue = event.target.value
    }) 
    let numberOfSlabsValue = ''

    ////////////////////////

    const createCheckBox = (div, eClass, eName) => {
        const input = document.createElement('input')
        input.type = 'checkbox'
        input.name = eName
        input.value = eName
        input.id = eName
        input.checked  = false
        input.classList.add(eClass)
      
        const label = document.createElement('label')
        const labelText = eName.slice(0,1).toUpperCase() + eName.slice(1, eName.length)
        label.appendChild(document.createTextNode(`${labelText}`))
        label.htmlFor = eName
      
        const checkBox = div.appendChild(input)
        div.appendChild(label)
      
        return checkBox
      }
      
      const handleMaterialSupplyClick = (materialSupplyElements) => {
        for (let i = 0; i < materialSupplyElements.length; i++) {
          materialSupplyElements[i].addEventListener('click', function(e) {
            [...materialSupplyElements].map(elem => {
              if(elem.id !== e.target.id){
                elem.checked = false
              }else {
                elem.checked = true
                materialSupplyValue = e.target.name
              }
            })
          })
        }
      }
      
      const handleMaterialTypeClick = (materialTypeElements) => {
        for (let i = 0; i < materialTypeElements.length; i++) {
          materialTypeElements[i].addEventListener('click', function(e) {
            [...materialTypeElements].map(elem => {
              if(elem.id !== e.target.id){
                elem.checked = false
              }else {
                elem.checked = true
                materialTypeValue = e.target.name
              }
            })
          })
        }
      }
      
      const handleCreateNewMaterialBtnClick = materialProperties => {
        const errors = []
      
        for (const key in materialProperties) {
          console.log(materialProperties[key])
          if (!materialProperties[key]) {
          errors.push(key)
          }
        }
      
        if(errors.length === 0) {
          const table = document.querySelector('#material-table')
          const row = table.insertRow(-1)
      
          let rowPosition = 0
      
          for (const key in materialProperties) {
            const cell = row.insertCell(rowPosition)
            cell.innerHTML = materialProperties[key]
            rowPosition ++
          }
      
         emptyInputs() 
        }else {
          alert(slabErrorMsgGenerator(errors))
        }
      }
      
      const slabErrorMsgGenerator = errors => {
        let msg = ''
      
        for (let i = 0; i < errors.length; i++) {
          switch (errors[i]) {
            case 'name':
              msg += 'please add name \n'
              break;
            case 'stNumber':
              msg += 'please add st- number \n'
              break;
            case 'materialSupply':
              msg += 'please add supply method \n'
              break;
            case 'materialType':
              msg += 'please add material type \n'
              break;
            case 'qty':
              msg += 'please add qty \n'
              break;
            case 'cost':
              msg += 'please add material cost \n'
              break;
            case 'location':
              msg += 'please add location \n'
              break;
            case 'markUp':
              msg += 'please add markup \n'
              break;
            default:
              break;
          }
        }
      
        return msg
      }
      
      const emptyInputs = () => {
        slabMarkupValue = ''
        costPerSlabValue = ''
        addMaterialNameValue = ''
        numberOfSlabsValue = ''
        locationInputValue = '' 
        stNumberValue = ''
        materialSupplyValue = undefined
        materialTypeValue = undefined
        uncheckCheckboxes(materialTypeElements)
        uncheckCheckboxes(materialSupplyElements)
        clearSlabsInputs()
      }

      const uncheckCheckboxes = checkboxes => {
        for (let i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked = false         
        }
      }

      const clearSlabsInputs = () => {
        costPerSlab.value = ''
        slabMarkup.value = ''
        addMaterialName.value = ''
        locationInput.value = ''
        numberOfSlabsInput.value = ''
        stNumber.value = ''
      }

      // create slabs checkboxes
      
      const slabsDiv = document.querySelector('#material-supply')
      let materialSupplyValue = undefined
      
      const materialSupplyElements = [
        createCheckBox(slabsDiv, 'material-supply', 'supply-and-pick-up'),
        createCheckBox(slabsDiv, 'material-supply', 'supply-Only')
      ]
      
      handleMaterialSupplyClick(materialSupplyElements)
      
      // create material type checkboxes
      
      const materialTypeDiv = document.querySelector('#material-type')
      let materialTypeValue = undefined
      
      const materialTypeElements = [
        createCheckBox(materialTypeDiv, 'material-type', 'engineered-stone'),
        createCheckBox(materialTypeDiv, 'material-type', 'marble'),
        createCheckBox(materialTypeDiv, 'material-type', 'granite'),
        createCheckBox(materialTypeDiv, 'material-type', 'hard-quartzite'),
        createCheckBox(materialTypeDiv, 'material-type', 'soft-quartzite'),
        createCheckBox(materialTypeDiv, 'material-type', 'porcelain-6mm'),
        createCheckBox(materialTypeDiv, 'material-type', 'porcelain-12mm'),
        createCheckBox(materialTypeDiv, 'material-type', 'porcelain-20mm')
      ]
      
      handleMaterialTypeClick(materialTypeElements)
      
      // st-number

      const stNumber = createInput('text', 'add-material-input', 'st-number-input', document.querySelector('#st-number'))
      stNumber.addEventListener('input', function(event){
        stNumberValue = event.target.value
      })
        let stNumberValue = ''    
      

      // create new material button
      
      const createNewMaterialBtn = document.querySelector('#create-new-material')
      
      createNewMaterialBtn.addEventListener('click', () => {
        if (costPerSlabValue) {
          costPerSlabValue = `$${costPerSlabValue}`
        }
        if (slabMarkupValue) {
          slabMarkupValue = `${slabMarkupValue}%`
        }
        
        const newMaterial = {   // name, stNumber, materialSupply , materialType, qty, cost, location, markUp
          name: addMaterialNameValue,
          stNumber: stNumberValue,
          materialSupply: materialSupplyValue,
          materialType: materialTypeValue,
          qty: numberOfSlabsValue,
          cost: costPerSlabValue,
          location: locationInputValue,
          markUp: slabMarkupValue
        }
      
        handleCreateNewMaterialBtnClick(newMaterial) 
      })