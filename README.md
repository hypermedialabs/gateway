- Quick installation using Vercel (recommended)
- _~~Manual installation on your own servers (Under construction)~~_

# Quick installation using Vercel (recommended)

For this installation we will have 2 ways to do it, the first one with a button to do it directly using the vercel dashboard or the second one using the Vercel CLI.

## Using the Vercel dashboard

1.  Click on the following button:
    [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?**repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world**)

2.  Finish the whole deployment process in Vercel and then copy the public url from here ![enter image description here](https://kpuytupfffedzdqkabsx.supabase.co/storage/v1/object/public/Documentation%20Images/SCR-20240117-injs.png)

3.  Go to Configuration -> Environment Variables
    ![enter image description here](https://kpuytupfffedzdqkabsx.supabase.co/storage/v1/object/public/Documentation%20Images/SCR-20240117-iocb.png)

4.  Set the `HYPERMEDIA_API_KEY` variable that has been created in [Hypermedia Access Keys Section](https://hypermedia.link/account/accesskeys)

5.  Set the `ALLOWED_DOMAINS` variable which is an array of strings with all domains authorized to get the upload information using their `HYPERMEDIA_API_KEY`. For example: ["https://server-uploader.vercel.app"]. Please do not add `localhost` domains in **production environments**.

This is how your environment variables section should look like at the end
![enter image description here](https://kpuytupfffedzdqkabsx.supabase.co/storage/v1/object/public/Documentation%20Images/SCR-20240117-iqxv.png)

At this point your server is ready to return to your client the necessary information to upload files using the [TUS Protocol](https://tus.io/).

6.  Now just go to your client and using the `@hypermedialabs/uploader` library paste the URL generated by vercel into the code. Here you have an example to use in the **client**:

        const uploader = useHypermediaUploader('https://server-uploader.vercel.app/api/upload-information',
        {
        	onProgress: (progress: number) => {
        		console.log("PROGRESS", progress)
        	},
        	onError: (error: any) => {
        		console.log("ON ERROR", error)
        	},
        	onSuccess: (response: any) => {
        		console.log("ON SUCCESS", response)
        	},

        	// Others options
        	...
        });

        const handleChange = (event: any) => {
        	// Here is you add your video
        	uploader.addFile(event.target.files[0]);
        };
