


export const successMessage = (abbr: string , full: string) => {

   const texts = [
       `Hey there, "${abbr}" would mean "${full}"`,
       `${abbr}: ${full}`,
       `Thanks for reaching out. People use "${abbr}" when referring to "${full}"`,
       `"${abbr}" is same as ${full}. You're welcome`,
       `"${abbr}" is used when you're trying to say "${full}"`,
       `"${abbr}" is equivalent to ${full}`,
       `${abbr} <==> ${full}`
   ]

   return texts[Math.floor(Math.random() * 7)]

}


export const failureMessage = () => {

   const texts = [
       `Sorry😢, I don't have this word in my dictionary`,
       `We would like to help but we can't because this isn't in our catalogue😢`,
       `oops😢. We don't know what that means. Check bio if you would like to add this abbreviation`,
       `Our database doesn't have this word😢`,
       `null!!. Thats what i get when i search this word`,
       `Sorry😢😢, I don't have this abbreviation in my catalogue. Check my bio if you want to add this word`
   ]

   return texts[Math.floor(Math.random() * 6)]

}