import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
    render(){
        return(
            <Html>
                <Head>
                    <link rel="shortcut icon" href="favicon.png" type="image/png"/>
			        <link rel="preconnect" href="https://fonts.gstatic.com"/>
    		        <link href="https://fonts.googleapis.com/css2?family=Akaya+Telivigala&family=PT+Sans+Narrow&display=swap" rel="stylesheet"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
		        </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}