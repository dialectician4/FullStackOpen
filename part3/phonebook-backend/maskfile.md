# FSO Tasks

## edit
> edit local maskfile

~~~bash
$EDITOR ./maskfile.md
~~~

## npm
> "npm" scripts

### npm build-ui
> Build frontend to dist/ dir
~~~bash
rm -rf dist && cd ../phonebook-frontend/ && npm run build && cp -r dist ../phonebook-backend/
~~~

## lint
> lint
~~~bash
npx eslint . --fix
~~~

## docker
> Docker commands

### docker save [platform] [image] (output)
> Specify a docker image for a given platform and save image to a zipped tar file.

- Defaults `platform` to linux/amd64 (assuming you'll be running image on a Linux-based VPS or other Linux-based service)
- Defaults `image` to same value, assuming your image name and output are the same and your image name is simple (has no \ or / characters) and file path-friendly.

~~~bash
PLATFORM=${platform=-"linux/amd64"}
# echo "Image $IMAGE"
if [ -z "$IMAGE" ]; then
    IMAGE=$output
fi

docker save --platform=$PLATFORM $IMAGE | gzip > $output.tar.gz
~~~

### docker run [port] [docker_port] (image)
> Run specified docker image while listening on $port to the active $docker_port

~~~bash
PORT=${port:-3001}
DOCKER_PORT=${docker_port:-3001}
echo "MASK: Docker run on 127.0.0.1:${PORT}:${DOCKER_PORT}"

docker run -it -p 127.0.0.1:$PORT:$DOCKER_PORT $image
~~~

### docker build (image)
> Build docker image with this directory's Dockerfile

~~~bash
docker build -t $image .
~~~

### docker deploy (image)
> Run on VPS to deploy a .tar.gz docker image

~~~bash
gzip -d $image.tar.gz
docker image rm -f $image
docker image load -i $image.tar
rm $image.tar
docker compose up -d
~~~

## dockerall
> Run docker pipeline

Maskfile should have its ENV defaults configured such that running `mask dockerall` executes your generic docker workflow without any further inputs.

**OPTIONS**
* build
    * flags: -b --build
    * desc: execute docker build stage
* run
    * flags: -r --run
    * desc: execute docker run stage
* save
    * flags: -s --save
    * desc: execute docker run stage
* image
    * flags: -i --image
    * type: string
    * desc: name of docker image to use across docker ocmmands
* compose
    * flags: -c --compose
    * desc: execute via compose detached
* deploy
    * flags: -d --deploy
    * desc: run deployment script for VPS
* local
    * flags: -l --local
    * desc: run local build pipeline preceding `deploy`

~~~bash
# echo "Given image ${image}"
IMAGE=${image:-fso3phonebook}
if [[ "$local" == "true" ]]; then
    mask npm build-ui
    mask docker build $IMAGE
    mask docker save $IMAGE
fi
# echo "Post default ${IMAGE}"
[[ "$build" == "true" ]] && mask docker build $IMAGE
[[ "$run" == "true" ]] && mask docker run $IMAGE
[[ "$save" == "true" ]] && mask docker save $IMAGE
[[ "$compose" == "true" ]] && docker compose up -d
[[ "$deploy" == "true" ]] && mask docker deploy $IMAGE

~~~

