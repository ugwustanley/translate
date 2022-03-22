


export const successMessage = (abbr: string , full: string) => {

   const texts = [
       `Hey there, "${abbr}" would mean "${full}"`,
       `${abbr}: ${full}`,
       `Thanks for reaching out. People use "${abbr}" when referring to "${full}"`,
       `Thanks for consulting me. "${abbr}" is same as "${full}".`,
       `"${abbr}" is used when you're trying to say "${full}"`,
       `"${abbr}" is equivalent to "${full}"`,
       `"${abbr}" <==> "${full}"`
   ]

   return texts[Math.floor(Math.random() * 7)]

}


export const failureMessage = () => {

   const texts = [
       `Sorry😢, I don't have this abbreviation in my dictionary`,
       `We would like to help but we can't. This isn't in our catalogue😢`,
       `oops😢. We don't know what that means. Check bio if you would like to add this abbreviation`,
       `Our database doesn't have this abbreviation😢`,
       `Null!!. That is what I get when I search for this abbreviation😢`,
       `Sorry😢😢, I don't have this abbreviation in my catalogue. Check my bio if you know what it means and want to include it to my catalogue`
   ]

   return texts[Math.floor(Math.random() * 6)]

}