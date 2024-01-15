import { IllegalResourceLocationException } from 'types'

class ResourceLocation {
  private namespace: string
  private path: string

  protected constructor (namespace: string, path: string) {
    this.namespace = namespace
    this.path = path
  }

  public static fromId (resourceLocation: string) {
    const a = resourceLocation.split(':')
    if (a.length < 2 || a[0].trim() === '') {
      throw new IllegalResourceLocationException('')
    }
    return new ResourceLocation(a[0], a[1])
  }

  public static fromRL (rl: ResourceLocation) {
    return this.fromId(rl.getString())
  }

  public getNamespace () {
    return this.namespace
  }

  public getPath () {
    return this.path
  }

  public getString () {
    return `${this.namespace}:${this.path}`
  }

  public toString () {
    return this.getString()
  }
}

export default ResourceLocation
