gsheets.getWorksheet(
  "1TjLdOyilM6NIx_Rv2WOQdFvTOu7KyYCHiWUxfMs4eSw", 
  "서울구재정자립도(오픈)",
  function(err, res) {
    if (err) throw new Error(err)

    document.querySelector(".js-year-selector")
    .addEventListener("change", function(e) {
      getDistributionByYear(e.target.id, res.data)
    })

    getDistributionByYear(2014, res.data)
  })

function getDistributionByYear(year, data) {
  var svg = document.querySelector("object").contentDocument
  return data
  .map(function(x) {
    return {id: x.id, value: x[year]}
  })
  .sort(function(x, y) {
    return x.value > y.value? 1 : -1 
  })
  .map(function(x, i, xs) {
    x.rank = (10 * x.value / xs[xs.length - 1]["value"]).toFixed(0) - 1
    return x
  })
  .forEach(function(x, i, xs) {
    svg.querySelector("#" + x.id).setAttribute("class", "fill" + x.rank)
  })
}
