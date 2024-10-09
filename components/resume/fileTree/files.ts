export type TFiles = {
  name: string;
  children?: TFiles[]
}

export const files: TFiles = {
  name: "root",
  children: [
    {
      name: "public",
      children: [
        {
          name: "portrait.jpg"
        },
        // {
        //   name: "resume.pdf"
        // }
      ]
    },
    {
      name: "src",
      children: [
        {
          name: "components",
          children: [
            {
              name: "about",
              children: [
                {
                  name: "about.tsx"
                }            
              ],
            },
            {
              name: "education",
              children: [
                {
                  name: "education.tsx",
                }            
              ],
            },
            {
              name: "workExperience",
              children: [
                {
                  name: "workExperience.tsx",
                }            
              ],
            },
            {
              name: "skills",
              children: [
                {
                  name: "technicalSkills.tsx",
                },
                {
                  name: "softwareAndTools.tsx",
                },
                {
                  name: "languagesAndSoftSkills.tsx",
                }            
              ],
            },
          ]
        }
      ]
    },
    {
      name: "README.md"
    },
    {
      name: ".gitignore", // Symbolic, showcasing your familiarity with Git
    },
    {
      name: "LICENSE.md" // Example license file, could symbolize your open-source contributions or permissions
    },
    {
      name: "package.json", // Symbolic file containing an overview of your 'skills dependencies'
    }
  ]
}